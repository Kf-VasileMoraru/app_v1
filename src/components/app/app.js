/* eslint-disable no-undef */
import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import './app.css';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[
                { label:'Going to learn React',important: false, like:false, id:'1' },
                { label:'Going to do AAAA' ,important: false, like:false, id:'2' },
                { label:'Going to be BBBB' , important: false, like:false,id:'3' }
            ],
            term:'',
            filter: 'all'
        };
        this.zz = this.zz.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
       
        this.startId = 4;
    }

    zz(id){
        this.setState(
            ({data})=>{
                const index = data.findIndex(elem => elem.id === id);

                const before = data.slice(0, index);
                const after = data.slice(index+1);
                const newArr = [...before, ...after];

                return{
                    data: newArr
                };
            }
        );
    }


    addItem(datax){
        const newItem = {
            id: this.startId++,
            label: datax
        };

        this.setState(({data})=>{
            return{
                data: [...data, newItem]
            };
        });
    }

    onToggleImportant(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id === id);
            const oldItem = data[index];
            const newItem = {...oldItem, important: !oldItem.important};
            console.log([...data.slice(0,index), newItem, ...data.slice(index+1) ]);
            return{
                data: [...data.slice(0,index), newItem, ...data.slice(index+1) ]
            };
        });
    }

    onToggleLiked(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id === id);
            const oldItem = data[index];
            const newItem = {...oldItem, like: !oldItem.like};
            console.log([...data.slice(0,index), newItem, ...data.slice(index+1) ]);
            return{
                data: [...data.slice(0,index), newItem, ...data.slice(index+1) ]
            };
        });
    }
    searchPost(items, term){
        if(term.length === 0){
            return items;
        }

        return items.filter((item)=>{
            return item.label.indexOf(term) > -1;
        });
    }

    filterPost(items, filter){
        if(filter === 'like'){
            return items.filter(item =>item.like);
        } else{
            return items;
        }
    }

    onUpdateSearch(term1){
        this.setState({term:term1});
    }

    onFilterSelect(term1){
        this.setState({filter:term1});
    }

        
    render(){
        const{data, term, filter} = this.state;

        const liked = data.filter(item=>item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return(
            <div className="app">
                <AppHeader
                    liked = {liked}
                    allPosts = {allPosts}/>
                
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch = {this.onUpdateSearch}/>
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                    
                </div>
                <PostList 
                    posts = {visiblePosts}
                    vasea={this.zz}
                    onToggleLiked={this.onToggleLiked}
                    onToggleImportant={this.onToggleImportant}
                />
                <PostAddForm 
                    onAdd = {this.addItem}/>
            </div>
        );
    }
}

