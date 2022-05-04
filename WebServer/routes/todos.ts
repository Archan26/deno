import { Router } from 'https://deno.land/x/oak/mod.ts';

const router = new Router();

interface Todo {
    id: string,
    text: string,
}

let todos: Todo[] = []

router.get('/todos',(ctx)=> {
    ctx.response.body = {todos: todos}
})

router.post('/todos', async (ctx: any) => {
    const data =  ctx.request.body({type: 'json'});
    console.log("data: ", data.value)
    const b1 = await data.value;
    const newTodo: Todo ={
        id: new Date().toISOString(),
        text: b1.text
    }
    todos.push(newTodo)
    console.log(todos)
    ctx.response.body = {message:"Created"}
})
router.put('/todos/:todoId', async (ctx:any)=> {
    const tid = ctx.params.todoId;
    const data = ctx.request.body({type: 'json'});
    const msg = await data.value
    const todoIndex = todos.findIndex((todo) =>{
        return todo.id === tid;
    });
    todos[todoIndex] = { id: todos[todoIndex].id, text: msg.text}
    ctx.response.body = {message:"Updated"}
})

router.delete('/todos/:todoId',(ctx)=> {
    const tid = ctx.params.todoId;
    todos = todos.filter((todo) => todo.id !== tid)
    ctx.response.body = {message:"Deleted"}
})


export default router;
