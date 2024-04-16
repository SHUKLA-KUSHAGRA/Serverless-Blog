import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { signupInput , loginInput  } from '@kushagra_shukla/medium-common';

export const userRouter = new Hono<{
    Bindings : {
      DATABASE_URL : string
      JWT_SECRET: string
    },
}>()

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({message : "Input not correct"});
    }
    try{
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name
        },
      })
      const token = await sign({id: user.id},c.env.JWT_SECRET);
      return c.json({
        jwt:token
      })
    } catch(e) {
      c.status(403);
      return c.text("INVALID CREDENTIALS");
    }
  })
  
  userRouter.post('/login', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const body = await c.req.json();
    const { success } = loginInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({message : "Input not correct"});
    }
    try{
      const user = await prisma.user.findUnique({
        where:{
          email: body.email,
          password: body.password
        }
      });
      if(!user)
      {
        c.status(403);
        return c.json({error : "user not found"});
      }
      const token = await sign({id:user.id},c.env.JWT_SECRET);
      return c.json({
        jwt:token
      });
    } catch(e) {
      c.status(411);
      return c.text("LOGIN FAILED");
    }
  })