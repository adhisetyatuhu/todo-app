import axios from "axios";

const DeleteModal = (props) => {
    const deleteTask = async () => {
        try {
            await axios.delete("http://localhost:3000/todos/" + props.data?.id);
            props.setIsDataUpdated(false);
            document.getElementById('delete_modal').close();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <dialog id="delete_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl text-sky-700">Are you sure?</h3>
                    <p className="py-4"><strong>{props.data?.name}</strong> will be deleted</p>
                    <div className="modal-action justify-between gap-5">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn text-sky-700">Cancel</button>
                        </form>
                        <button onClick={() => deleteTask()} className="btn bg-sky-600 text-white hover:bg-sky-500 active:bg-sky-700">Yes, I am sure</button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}

export default DeleteModal;