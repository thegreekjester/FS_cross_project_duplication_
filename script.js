var axios = require('axios');
var argv = require('argv');
var data;


//Header config for the axios requests
var config_post = {
  headers: {
    'Authorization': `Bearer ${argv.token}`,
    'Content-Type': 'application/json'
  }
}

var config_get = {
  headers: {
    'Authorization': `Bearer ${argv.token}`
  }
}

var expJSON = {}


//axios request to get the experiment I want to move
axios.get(`https://api.optimizely.com/v2/experiments/${argv.experiment_id}`, config_get)
  .then((res) => {
      data = res.data;
      expJSON.project_id = argv.project_id;
      expJSON.audience_conditions = data.audience_conditions;
      expJSON.key = data.key + '_2';
      expJSON.metrics = data.metrics;
      expJSON.name = data.name + '_2';
      var new_variations = data.variations;
      for(i = 0; i<new_variations.length; i++){
          delete new_variations[i].variation_id;
      }
      expJSON.variations = new_variations;
      if(data.type === 'feature'){
          expJSON.type = data.type;
          axios.get(`https://api.optimizely.com/v2/features/${data.feature_id}`, config_get)
            .then((res) => {
                console.log(res.data);
                feature_JSON = {};
                feature_JSON.key = res.data.key;
                feature_JSON.type = res.data.type;
                var new_variables = res.data.variables;
                for(i = 0; i<new_variables.length; i++){
                     delete new_variables[i].id;
                  }
                feature_JSON.variables = new_variables;
                feature_JSON.project_id = argv.project_id;
                  axios.post('https://api.optimizely.com/v2/features', feature_JSON, config_post)
                    .then((res) => {
                        expJSON.feature_id = res.data.id;
                        axios.post('https://api.optimizely.com/v2/experiments', JSON.stringify(expJSON), config_post)
                        .then((res) => {
                            console.log('we duplicated your feature test, refresh your project now!')
                        })
                        .catch((error) => {
                            console.log('problem creating this feature test', error)
                        })
                    })
                    .catch((error) => {
                        console.log('something is wrong with getting the feature', error)
                    })
            })
      }else{

      axios.post('https://api.optimizely.com/v2/experiments', JSON.stringify(expJSON), config_post)
        .then((res) => {
            console.log('we duplicated your a/b test, refresh your project now!')
        })
        .catch((error) => {
            console.log('oops')
        })
    }
  })
  //This marks the end of the get request for the origignal get for the experiment
  .catch((error) => {
    console.log(error)
  })
