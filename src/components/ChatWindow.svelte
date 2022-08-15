<script>
  import { onMount, afterUpdate } from 'svelte'
  import ChatBubble from './ChatBubble.svelte';
  import { io } from '$lib/realtime';

  // Create a local store to cache data from GUN
  let windowEl

  let newMessage = ''
  export let user = ''
  let log = []

  $: windowEl

  afterUpdate(() => {
    windowEl.scrollTo({
      top: windowEl.scrollHeight,
      behavior: 'smooth'
    })
  })

  console.log(log)

  onMount(() => {
    io.on('newMessage', msg => {
      console.log(msg, log)
      log.push(JSON.parse(msg))
      log = log
    })
  })

  async function onSubmit(e) {
    const formData = new FormData(e.target);

    const data = {};
    for (let field of formData) {
      const [key, value] = field;
      data[key] = value;
    }

    const { message } = data;

    if (message.length === 0) return

    const json = {
      author: user,
      message,
      timestamp: new Date().getTime(),
    };

    io.emit('chatMessage', json);

    newMessage = ''
  }	
</script>

<div class='container'>
  <div bind:this={windowEl} class='chat-window'>
    {#each log as json}
      <div key={json} class='chat-message'>
        <ChatBubble message={json} user={user} />
      </div>
    {/each}
  </div>
  <div>
    <div>
      <form class="text-form" on:submit|preventDefault={onSubmit}>
        <div class='text-box'>
          <input 
            class="text-input" 
            type="text"
            id="message"
            name="message"
            bind:value={newMessage}
          />
        </div>
        <!-- <button type="submit">Send!</button> -->
      </form>
    </div>
  </div>
</div>

<style>
  .container {
    margin: auto;
    display: flex;
    flex-direction: column;
    background: #212121;
    padding: 5px;
  }
  .chat-window {
    max-height: 300px;
    overflow-y: auto;
  }

  .chat-window--waiting {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .text-input {
    width: calc(100% - 60px);
    background: transparent;
    border: none;
    outline: none;
    position: relative;
    margin: 0;
    z-index: 2;
  }

  .text-form {
    width: calc(100% - 10px);
    padding: 5px;
    display: flex;
    flex-grow: 1;
    background: #212121;
  }

  .image {
    width: 200px;
    height: 200px;
  }

  .image > svg {
    width: 100%;
    height: 100%;
  }

  .text-box {
    /* margin: 10px 0; */
    padding: 10px;
    position: relative;
    display: flex;
    align-items: center;
    z-index: 3;
    background: rgba(0, 0, 0, 0.5);
    width: calc(100% - 20px);
    height: calc(100% - 20px);
  }

  .text-box::before {
    content: '';
    display: block;
    border: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  } 
</style>