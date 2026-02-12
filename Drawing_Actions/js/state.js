export const initialState={
    past:[],
    present:[],
    future:[]
};

export  function drawShape(state,shape){
return {
    past: [...state.past, state.present],
    present:[...state.present, shape],
    future:[]
}
};

export function undo(state){
if(state.past.length===0) return state;
const previous=state.past[state.past.length-1];
const newPast= state.past.slice(0,-1);
return{
    past:newPast,
    present:previous,
    future:[state.present,...state.future]
};
}

export function redo(state){
    if(state.future.length===0) return state;
    const next=state.future[0];
    const newFuture=state.future.slice(1);    
    return{
        past: [...state.past, state.present],
        present:next,
        future:newFuture

    };

}