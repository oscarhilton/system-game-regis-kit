<script>
  import { onMount } from 'svelte'
  import ChatWindow from '../components/ChatWindow.svelte';
  import { io } from '$lib/realtime';

  export let title;
  let username = "Anon"

  io.on('name', (name) => {
    // Another listener for the name:
    username = name; // Update the name so it can be displayed
  });

</script>

<main>
  <h1>Welcome to {title}, {username}</h1>
  <ChatWindow user={username} />
</main>
