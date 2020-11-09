# ispovesti.ml-frontend

This is the frontend for ispovesti.ml

## Installation

Clone this repository and edit API_ROOT variable in constants.js file to point to your backend service ip address.

```
git clone git@github.com:dojitza/ispovesti.ml-frontend.git
$YOUR_EDITOR ispovesti-ml-frontend/src/constants.js
...
API_ROOT: $YOUR_BACKEND_IP,
...
```

build the static files, and then host with a web server of your choice

```
cd ispovesti-ml-frontend
npm run build
cd build
$YOUR_WEB_SERVER serve
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[GNU GPLv3 ](https://choosealicense.com/licenses/gpl-3.0/)
