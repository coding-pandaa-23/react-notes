import { useEffect, useState } from "react";
import Database from "./Database.util";

const HomeView = () => {

    let db = new Database();

    let [search, setSearch] = useState('');
    let [title, setTitle] = useState('');
    let [content, setContent] = useState('');
    let [activeNote, setActiveNote] = useState('');
    let [list, setList] = useState([]);

    // Initialize
    useEffect(()=>{
        reset()
    }, []);

    // Reset
    function reset(){
        setTitle('');
        setContent('');
        setActiveNote(null);
        setList(db.list());
    }

    // Save Changes
    function saveChanges(){
        let mNote = {
            id: activeNote?.id,
            title: title,
            content: content,
        }

        if(mNote.title !== ''){
            if(mNote.id){
                db.update(mNote);
            }else{
                db.insert(mNote);
            }
        }else{
            alert('please enter note title')
        }

        reset();
    }

    // Delete Note
    function deleteNote(){
        if(activeNote){
            let confirmDelete = window.confirm('Do tou want to delete Note?');
            if(confirmDelete){
                db.delete(activeNote);
                alert('Note was deleted');
                reset()
            }
        }
    }

    // Copy Content
    function copyContent(){
        if(activeNote){
            navigator.clipboard.writeText(activeNote.content);
        }
    }

    // Select Note
    function selectNote(note){
        if(activeNote == null || activeNote?.id != note.id){
            setActiveNote(note);
            setTitle(note.title);
            setContent(note.content);
        }else{
            reset()
        }
    }


    return ( <>
        <div className="container-fluid mt-3">
            <div className="row">
                {/* Actions Bar */}
                <div className="col-12">
                    <div className="card border-0 shadow p-2 mb-3">
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <input 
                                    type="search" className="form-control border-0 shadow-none w-100" placeholder="Search"
                                    value={search} onChange={(e)=> setSearch(e.target.value)}/>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="d-flex justify-content-end">

                                    <div>
                                        {activeNote && <button className="btn btn-secondary mx-1" onClick={reset}>Cancel</button>}
                                        {activeNote && <button className="btn btn-danger mx-1" onClick={deleteNote}>Delete</button>}
                                        {activeNote && <button className="btn btn-warning mx-1" onClick={copyContent}>Copy</button>}
                                        <button className="btn btn-primary mx-1" onClick={saveChanges}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Notes List */}
                <div className="col-12 col-lg-3">
                    <div className="card border-0 shadow h-80 of-auto">
                    <div className="list-group border-0 rounded-0">
                        {list
                        .filter((note)=> note.title.toLowerCase().includes(search.toLowerCase()))
                        .map((note, index)=>(<a 
                            href="" key={index}
                            onClick={(e)=>{e.preventDefault(); selectNote(note)}}
                            className={`list-group-item list-group-item-action border-0 border border-bottom ${activeNote?.id == note.id && 'active'}`}>
                               {note.title}</a>))}
                        
                    </div>
                    </div>
                </div>
                {/* Active Note Title & Content */}
                <div className="col-12 col-lg-9">
                    <div className="card border-0 shadow h-80">
                        <div>
                            <input 
                                type="text" className="form-control border-0 shadow-none" placeholder="Title"
                                value={title} onChange={(e)=> setTitle(e.target.value)} />
                        </div>

                        <hr className="m-1" />

                        <textarea 
                            className="form-control border-0 shadow-none h-100" placeholder="Content"
                            value={content} onChange={(e)=> setContent(e.target.value)}></textarea>
                    </div>
                </div>
            </div>
        </div>
    </> );
}
 
export default HomeView;