/**
 * Copyright 2019 the staking-dashboard authors
 * This file is part of the staking-dashboard library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import { common } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  createStyles,
  MuiThemeProvider,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { Header } from './components/Header';

const appVersion = (window as any).appVersion;

const baseTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#000000' },
    secondary: { main: '#000000' },
    background: {
      default: '#000000',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
  overrides: {
    MuiTableCell: {
      body: {
        borderColor: fade(common.white, 0.15),
      },
    },
  },
});

const styles = (theme: Theme) =>
  createStyles({
    appContainer: {
      margin: 'auto',
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
      position: 'relative',
      maxWidth: 1100,
    },
  });

export const AppRoot = withStyles(styles)(({ classes }: WithStyles<typeof styles>) => (
  <BrowserRouter>
    <MuiThemeProvider theme={baseTheme}>
      <CssBaseline />
      <Header />
      <div className={classes.appContainer}>
        <App />
      </div>
    </MuiThemeProvider>
  </BrowserRouter>
));
