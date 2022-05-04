const text = "This is test message";

const encoder = new TextEncoder();
const data = encoder.encode(text);

Deno.writeFile('message.txt', data).then(()=>{
    console.log("Done.")
})