import $  from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { SkyMap } from './skyMapCalls';
import {ConstellationDetails} from './Constellationinfo';

 $(document).ready(function() {
   $('.nav-link[name=constellations]').click(function() {
      let constellationWiki = new ConstellationDetails();
      console.log(constellationWiki);
      $("#toShow").showConstellations();

// $('.showErrors').display('');


  })
});

