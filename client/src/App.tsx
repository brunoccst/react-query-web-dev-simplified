import React from 'react';
import './App.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wait } from 'utils';

const POSTS = [
  { id: crypto.randomUUID(), title: "Post 1" },
  { id: crypto.randomUUID(), title: "Post 2 " }
]

function App() {
  const queryClient = useQueryClient();

  // Queries: getting data from somewhere
  const postQuery = useQuery({
    queryKey: ["posts"], // Unique identifier for the query
    queryFn: () => wait(1000).then(() => [...POSTS]) // Runs to actually query the data
  })

  // Mutation: changing some type of data
  const newPostMutation = useMutation({
    mutationFn: (title: string) => wait(1000)
      .then(() => POSTS.push({ id: crypto.randomUUID(), title: title })),
    onSuccess: () => queryClient.invalidateQueries(["posts"])
  })

  if (postQuery.isLoading) return <h1>Loading...</h1>
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>

  return (
    <div>
      {postQuery.data.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button
        disabled={newPostMutation.isLoading}
        onClick={() => newPostMutation.mutate("New Post")}>
        Add New
      </button>
    </div>
  );
}

export default App;
