const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens:{
      'sm-1': {'min' : '400px','max' : '500px'},
      'sm-2': {'min' : '250px','max' : '400px'},
      'md-1' :{'min' : '510px','max' : '650px'}
    }
  },
  plugins: [],
});

