import { SubmitButton } from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'
import Link from "next/link";
import { redirect } from "next/navigation";

async function getData({noteId, userId} : {noteId: string, userId: string}){
    noStore();
    const data = await prisma.note.findUnique({
        where: {
            id: noteId,
            userId: userId
        }, 
        select: {
            title: true,
            description: true,
            id: true
        }
    })
    return data;
}
export default async function DynamicRoute({
    params,
  }: {
    params: { id: string };
  }) {
    console.log(params.id);
    const {getUser} = await getKindeServerSession();
    const user = await getUser();
    const data = await getData({userId: user?.id as string, noteId: params.id});

    async function postData(formData: FormData) {
        "use server"
        if(!user) throw new Error(`User not found...`);

        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        await prisma.note.update({
            where: {
                id: data?.id,
                userId: user?.id
            },
            data: {
                title: title,
                description: description,
            }
        });

        revalidatePath('/dashboard')

        return redirect('/dashboard');
    }

    return (
        <Card>
            <form action={postData}>
                <CardHeader>
                    <CardTitle>Edit note</CardTitle>
                    <CardDescription>Right here you can edit your notes</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-5">
                    <div className=" gap-y-2 flex flex-col">
                        <Label>Title</Label>
                        <Input required type="text" name="title" placeholder="Title for your note" defaultValue={data?.title}/>
                    </div>
                    <div className=" gap-y-2 flex flex-col">
                        <Label>Description</Label>
                        <Textarea name="description" placeholder="Describe your note as you want" required defaultValue={data?.description}/>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button asChild variant="destructive">
                        <Link href='/dashboard'>Cancel</Link>
                    </Button>
                    <SubmitButton />
                </CardFooter>
            </form>
        </Card>
    )
}