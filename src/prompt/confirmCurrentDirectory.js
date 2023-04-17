import { blue, gray, green, reset, yellow } from "../util/colors.js";

export const confirmQ =
  blue +
  "?: " +
  gray +
  "Lit PWA template will be installed in current directory (default: yes)" +
  green;

export const clearDirMsg =
  yellow +
  "Current directory is not empty, please clear it and try again" +
  reset;
