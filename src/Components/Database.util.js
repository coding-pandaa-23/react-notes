const key  = 'panda-notes-database';

export default class Database{

    // Get All Notes
    list(){
        let source = localStorage.getItem(key);

        if(source == null){
            return [];
        }else{
            return JSON.parse(source);
        }
    }

    // Update All Notes
    updateList(list){
        let source = JSON.stringify(list);
        localStorage.setItem(key, source);
    }

    // Insert Note
    insert(note){
        let list = this.list();

        // Check ID
        note.id ??= this.generateID();

        list.push(note);
        this.updateList(list);
    }

    // Update Note
    update(note){
        let list = this.list();
        let index = list.findIndex((n)=> n.id == note.id);
        if(index >= 0){
            list[index] = note;
            this.updateList(list);
        }
    }

    // Delete Note
    delete(note){
        let list = this.list();
        let index = list.findIndex((n)=> n.id == note.id);
        if(index >= 0){
            list.splice(index, 1)
            this.updateList(list);
        }
    }

    // Generate A Unique ID
    generateID(){
        return new Date().getTime().toString();
    }
}