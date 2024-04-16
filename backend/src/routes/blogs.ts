import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL : string
        JWT_SECRET : string
    },
    Variables : {
        userId : string
    }
}>();

blogRouter.use('/*', async (c,next) => {
    const authHeader = c.req.header("authorization") || "";
    try{
        const user = await verify(authHeader,c.env.JWT_SECRET);
        if(user) {
            c.set('userId',user.id);
            await next();
        }
        else {
            return c.json({
                message : "User Not Logged In"
            })
        }
    } catch(e) {
        c.status(403);
        return c.json({message : "Unauthorized Access"});
    }
})

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const userId = c.get('userId');
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        },
    })
    return c.json({id : post.id});
})

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const post = await prisma.post.update({
        where: {
            id : body.id
        },
        data: {
            title: body.title,
            content: body.content,
        },
    })
    return c.json({id : post.id});
})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
        const posts = await prisma.post.findMany({
            select : {
                content: true,
                title: true,
                id: true,
                author: {
                    select:{
                        name : true
                    }
                }
            }
        });
        return c.json({posts});
    } catch (e) {
        c.status(411);
        return c.json({message : "error while fetching blog posts"});
    }
})

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const id = await c.req.param("id");
    try{
        const post = await prisma.post.findFirst({
            where: {
                id : id
            },
            select : {
                title : true,
                content : true,
                id : true,
                author : {
                    select : {
                        name : true
                    }
                },
            }
        })
        return c.json({post});
    } catch (e) {
        c.status(411);
        return c.json({message : "error while fetching blog post"});
    }
})