# FS_cross_project_duplication_ ![CI status](https://img.shields.io/badge/build-passing-brightgreen.svg)

Cross_project_exp_duplication is a js script for dealing with cross project experiment duplication on Optimizely X Web.

## Installation

### Requirements
* Node.js
* axios
* argv
* An Optimizely Token (from registered app) Profile > create token

`$ npm install` - To get all of required libraries


## Usage

```javascipt
node script.js --experiment_id=234234235 --project_id=34235235 --token=235q2246246346
```

--experiment_id is the experiment you wish to duplicate (required)

--project_id is the project you wish to duplicate it to (required)

--token is the bearer token generated in Profile > API access within Optimizely

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
