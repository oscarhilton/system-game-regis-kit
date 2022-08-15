<script>
  export let message;
  export let user
  
</script>

<div class="container">
  <div class="stats">
    <span class="time">{message?.timestamp}</span>  <span class="name">{message?.author}</span>
  </div>
  <div class="aligner aligner--{user === message?.author ? 'client' : 'other'}">
    <div class="message message--{user === message?.author ? 'client' : 'other'}">
      {message?.message}
    </div>
  </div>
</div>

<style>
  .container {
    margin: 10px 30px;
    font-size: 10px;
    padding: 8px;
    border-radius: 10px;
    color: white;
  }

  .stats {
    opacity: 0;
    transition: opacity 0.1s, transform 0.2s, background-color 0.4s;
    text-align: left;
  }

  .stats:last-of-type {
    opacity: 1;
  }

  .container:hover {
    background-color: rgba(255, 255, 255, 0.07);
  }
  .container:hover > .stats {
    opacity: 1;
    transform: translateY(0);
  }

  .aligner {
    width: 100%;
    flex-wrap: wrap;
    display: flex;
  }

  .aligner--client {
    justify-content: flex-end;
  }

  .aligner--other {
    justify-content: flex-start;
  }

  .time {
    margin-left: 5px;
    opacity: 0.3;
    margin-bottom: 5px;
    display: inline-block;
  }

  .name {
    margin-left: 5px;
    display: inline-block;
  }

  .message {
    padding: 10px 15px 9px;
    background: #F2C85B;
    /* box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.2); */
    border-radius: 20px 20px 20px 3px;
    color: #111111;
    display: block;
    line-height: 1.6;
    font-size: 13px;
    max-width: 400px;
    margin: 5px 0;
  }

  .message--client {
    background-color: #D8E46B;
    justify-self: flex-end;
    border-radius: 20px 20px 3px 20px;
  }
</style>