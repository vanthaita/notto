'use client'
import { Button } from "@/components/ui/button";
import {RegisterLink} from "@kinde-oss/kinde-auth-nextjs/components";



export default function Home() {
  return (
    <section className="flex items-center justify-center bg-background h-[90vh]">
      <div className=" relative items-center w-full px-5 py-12 mx-auto lg:px-6 max-w-7xl md:px-12">
        <div className=" max-w-3xl mx-auto text-center">
        <div>
          <span className=" w-auto px-6 py-3 rounded-full bg-secondary">
            <span className=" text-sm font-medium text-primary">
                Sort your notes easily
            </span>
          </span>
          <h1 className=" mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
            Create Notes with ease
          </h1>
          <p className="mt-8 max-w-xl mx-auto text-base lg:text-xl text-secondary-foreground">
            Create notes with ease and organize them with ease.
          </p>

          <div className="flex justify-center max-w-sm mx-auto mt-10">
            <RegisterLink>
              <Button className=" w-full" size="lg">
                Sign up for free!
              </Button>
            </RegisterLink>
          </div>
        </div>
        </div>
      </div>      
    </section>
  );
}
