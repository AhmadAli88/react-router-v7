import React from "react";
import { Form, redirect, useFetcher, useLoaderData, useNavigate } from "react-router-dom";

// Define the shape of the loader data
type LoaderData = {
  postId: string;
};
export async function clientAction({
  params,
}: {
  params: { postId: string };
}): Promise<Response> {
  try {
    const { postId } = params;
    // Simulate a delete action
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: "DELETE",
    });
    return new Response(JSON.stringify({ isDeleted: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ isDeleted: false }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
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
  const navigate= useNavigate()
  const data = useLoaderData() as any;
  const fetcher = useFetcher();
  const isDeleted = fetcher.data?.isDeleted;
  return (
    <div>
      {!isDeleted && (
        <>
          <p>Post: {data.title}</p>
          <p>Body: {data.body}</p>
          <button type="submit" onClick={() => navigate("/")}>Redirect</button>
          <fetcher.Form method="delete">
            <button type="submit">Delete</button>
          </fetcher.Form>
        </>
      )}
      {isDeleted && <p>Post has been deleted.</p>}
    </div>
  );
};

export default Post;
