# dsra-twitter-app 

This project is an application that allow user to filter twitter data base on user name, hashtag, keywords and geo locations.

To get you started you can simply clone the dsra-twitter-app repository and install the dependencies:

### Prerequisites

You need git to clone the dsra-twitter repository. You can get git from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and install dependency needed for the application. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Clone dsra-twitter-app

Clone the twitter-app repository using [git][git]:

```
git clone https://github.com/annieweng/dsra-twitter-app.git
cd twitter-app
```

#add twitter api keys
cp twitter-api-keys-temp.yml twitter-ap-keys.yml and enter values for twitter api keys

### Install Dependencies

We have three kinds of dependencies in this project: tools, python modules and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].
* we get the python module dependencies via 'pip'
We have preconfigured `npm` to automatically run `bower` and 'pip' so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install` and 'pip install'.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `static/bower_components and static/components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
this project changes this location through the `.bowerrc` file.  Putting it in the static folder makes
it easier to serve the files by a python web container

### Run the Application

```
python app.py
```

Now browse to the app at `http://localhost:5000`.




## Updating Angular dependencies

the angular framework library code and tools are acquired through package managers (npm and
bower) you can use these tools instead to update the dependencies.

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.


## Loading Angular Asynchronously

The angular-seed project supports loading the framework and application scripts asynchronously.  The
special `index-async.html` is designed to support this style of loading.  For it to work you must
inject a piece of Angular JavaScript into the HTML page.  The project has a predefined script to help
do this.

```
npm run update-index-async
```

This will copy the contents of the `angular-loader.js` library file into the `index-async.html` page.
You can run this every time you update the version of Angular that you are using.


