import React from 'react';
import ReactDOM from 'react-dom';

import Clock from './clock';
import Tabs from './tabs';
import Weather from './weather';
import AutoComplete from './autocomplete';


function Root() {
    return(
        <div>
            <Clock />
            <Weather />
            <div className='side-by-side'>
            <Tabs panes={panes}/>
            <AutoComplete names={names}/>
            </div>
        </div>
    );
}

const names = [
    'Jake',
    'Brody',
    'Dom',
    'Nick',
    'Jade',
    'Peter',
    'Tom'
];

const panes = [
{title: 'one', content: 'I am the first'},
{title: 'two', content: 'I am the second' },
{title: 'three', content: 'I am the third' }
];



document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<Root/>, document.getElementById('root'));
});