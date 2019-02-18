import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  overrides: {
    MuiTypography: {
      h3: {
        fontWeight: 300
      }
    }
  }
});