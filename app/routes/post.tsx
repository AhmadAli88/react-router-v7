import React from "react";
import { Form, redirect, useLoaderData } from "react-router-dom";

// Define the shape of the loader data
type LoaderData = {
  postId: string;
};
export async function clientAction({
  params,
}: {
  params: { postId: string };
}): Promise<Response> {
  const { postId } = params;
  // Simulate a delete action
   await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      method: 'DELETE',
    })
  return redirect(`/`);
}

// Loader function with correct return type
export async function loader({
  params,
}: {
  params: { postId: string };
}): Promise<LoaderData> {
  const { postId } = params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const data = await response.json();
  return data;
}



// React component that uses the loader data
const Post: React.FC = () => {
  const data = useLoaderData() as any;

  return <div>
    <p>Post: {data.title}</p>
    <p>Body: {data.body}</p>
    <Form method="delete">
      <button type="submit">Delete</button>
    </Form>
    </div>;
};

export default Post;
