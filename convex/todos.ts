import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
export const getTodos = query({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").order("desc").collect()
        return todos
    }
})


export const addTodo = mutation({
    args: { text: v.string() },
    handler: async (ctx, args) => {
        const todoId = await ctx.db.insert("todos", {
            text: args.text, isCompleted: false
        })
        return todoId
    }
})

export const toggleTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        const todo = await ctx.db.get(args.id);
        if (!todo) throw new ConvexError("Todo not found");
        await ctx.db.patch(args.id, {
            isCompleted: !todo.isCompleted
        })
    }
})

export const updateTodo = mutation({
    args: { id: v.id("todos"), text: v.string() },
    handler: async (convexToJson, args) => {
        await convexToJson.db.patch(args.id, {
            text: args.text
        })
    },
})

export const deleteTodo = mutation({
    args: { id: v.id("todos") },
    handler: async (ctx, args) => {
        const todo = await ctx.db.get(args.id);
        if (!todo) throw new ConvexError("Todo not found");
        await ctx.db.delete(args.id);
    }
})


export const clearAllTodos = mutation({
    handler: async (ctx) => {
        const todos = await ctx.db.query("todos").collect();
        // delete all the todos
        for (const todo of todos) {
            await ctx.db.delete(todo._id);
        }

        return { deletedCount: todos.length };
    }
})