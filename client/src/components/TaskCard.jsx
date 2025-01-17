import { useEffect, useState } from "react";
import server from "../../utils/axios";


export function LoadingTaskCard() {
    return (
        <>
            <div className='mt-2'>
                <div className='py-2 px-4 border bg-gray-300 rounded flex justify-between'></div>
            </div>
        </>
    )
}

const TaskCard = (props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [inputEdit, setInputEdit] = useState(props.data);

    const handleClickDelete = () => {
        props.setTaskData(props.data);
        document.getElementById('delete_modal').showModal();
    }

    const markChecked = async () => {
        try {
            await server.put("/todos/" + props.data?.id, { ...props.data, is_checked: !props.data?.is_checked });
            props.setIsDataUpdated(false);
        } catch (error) {
            console.log(error);
        }
    }

    const editTask = async (e) => {
        e.preventDefault();
        try {
            await server.put("/todos/" + props.data?.id, inputEdit);
            props.setIsDataUpdated(false);
            setIsEdit(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        props.setIsDataUpdated(false);
    }, [inputEdit]);

    return (
        <div className='mt-2'>
            <div className='py-2 px-4 border border-blue-600/30 rounded flex justify-between shadow-sm'>
                {
                    !isEdit &&
                    <>
                        <form className='flex items-center'>
                            <input onChange={() => markChecked()} className={'me-2 border border-blue-800/20 bg-blue-400/10 checkbox checkbox-xs ' + (props.data.is_checked && 'checkbox-success [--chkfg:white]')} type='checkbox' id={"checkbox_" + props.data?.id} name={"checkbox_" + props.data?.id} checked={props.data.is_checked && 'checked'} />
                            <label style={{ WebkitAnimationIterationCount: 0.5, animationIterationCount: 0.5 }} className={props.data?.is_checked ? "duration-75 ease-linear animate-bounce line-through" : ""} htmlFor={"checkbox_" + props.data?.id}>{props.data?.name}</label>
                        </form>
                        <div className={isEdit ? "hidden" : "flex flex-nowrap"}>
                            {/* edit button */}
                            <button className='mx-2 bg-blue-100 px-1 rounded-full active:bg-white' onClick={() => setIsEdit(true)}>
                                <svg className="hover:fill-blue-600/70" fill="rgb(37 99 235 / 1)" height={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    {/* <!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                                    <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
                                </svg>
                            </button>
                            {/* end edit button */}

                            {/* delete button */}
                            {/* <button onClick={() => deleteTask()} className="active:bg-black"> */}
                            <button onClick={() => handleClickDelete()} className="active:bg-white bg-red-100 px-1 rounded-full">
                                <svg className="hover:fill-red-500/70" fill="rgb(255 0 0 / 0.9)" height={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    {/* <!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
                                    <path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                                </svg>
                            </button>
                            {/* end delete button */}

                        </div>
                    </>
                }
                {
                    isEdit &&
                    <form onSubmit={(e) => editTask(e)} className="flex justify-between flex-nowrap w-full">
                        <input onChange={(e) => setInputEdit({ ...props.data, name: e.target.value })} className="w-full border-b border-black/20 shadow-blue-50 focus:outline-none" value={inputEdit.name} />
                        <button onClick={(e) => editTask(e)} className="float-end bg-black text-white text-xs px-1 py-0 rounded">OK</button>
                    </form>
                }
            </div>
        </div >
    );
}

export default TaskCard;