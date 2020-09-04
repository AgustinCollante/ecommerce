import React from 'react';
// import logo from './logo.svg';
import Catalogo from './components/Catalogo/Catalogo'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Crud from './components/crud/crud'
import Product from './components/Products/product.js'
import './app.css'

function App() {

  const productos = [ { categoria:1, id:1,name:'Rolex',precio:2000, src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
  { categoria:1,id:2,name:'Rolex',precio:2000, src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0000_m326238-0009-sky-dweller.jpg?imwidth=550'},
  { categoria:2,id:3,name:'Rolex',precio:2000, src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0002_m228239-0033-day-date-40.jpg?imwidth=550'},
  { categoria:2,id:4,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0013_m86409rbr-0001-pearlmaster-39.jpg?imwidth=550'},
  { categoria:6,id:5,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0014_m50535-0002-cellini-moonphase.jpg?imwidth=550'},
  { categoria:3,id:6,name:'Rolex',precio:2000, src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0008_m124060-0001-submariner.jpg?imwidth=550'},
  { categoria:4,id:7,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0005_m126603-0001-sea-dweller.jpg?imwidth=550'},
  { categoria:5,id:9,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0004_m126711chnr-0002-gmt-master-ii.jpg?imwidth=550'}];

  return (
    <Router>
      <div> 
        <Route
         path='/'
         component={Nav}
        />
        
        <Route
         path='/crud'
        component={Crud}
        />

        <Route 
         exact path='/catalogo'
         render={()=> <Catalogo productos={productos} />}
        />

        <Route 
         exact path= "/catalogo/:id"
         render={({match})=> <Catalogo productos={productos.filter(p => p.categoria === Number(match.params.id))} />}
        />

        <Route
           path='/catalogo/product/:id'
          render={({match}) => 
          <div className='product'>
            <Product data={productos.filter(p => p.id === Number(match.params.id))}/>
          </div>}
        />
      </div> 
    </Router>
  );
}

export default App;
