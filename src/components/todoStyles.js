
export const todoPaperStyle = {
    padding: "30px 20px",
    height: '80vh',
    width: 420,
    margin: "0px auto",
    minHeight: 0,
    overflow: "hidden",
};
export const todoListStyle = {
    box: {
        height: 30,
        margin: "10px 0",
        display: "flex",
        border: "1px solid black",
        padding: "8px auto",
    }

}
export const completedStyle = (completed) => {
    return completed ? { textDecoration: "line-through" } : null;
};