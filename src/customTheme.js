import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  overrides: {
    typography: {
      useNextVariants: true,
    },
    MuiTypography: {
      h3: {
        fontWeight: 300
      }
    }
  }
});