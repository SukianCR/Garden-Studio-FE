// test if the window is refreshed
const IsRefreshedWindow = () => {
  let p;
  let result;

  if (window.performance.getEntriesByType("navigation")) {
    p = window.performance.getEntriesByType("navigation")[0].type;

    if (p == "navigate") {
      result = "NAVIGATE";
    }
    if (p == "reload") {
      result = "RELOAD";
    }
    if (p == "back_forward") {
      result = "BACK_FORWARD";
    }
    if (p == "prerender") {
      result = "PRERENDER";
    }
  }
  console.info("window.performance.getEntriesByType", result);
  return result;

  /*    Marked as deprecated - performance.navigation.type
// check for Navigation Timing API support
  if (window.performance) {
    https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming
  }
  console.info(performance.navigation.type);
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    console.info("This page is reloaded");
    return true;
  } else {
    console.info("This page is not reloaded");
    return false;
  }
    */
};

export default IsRefreshedWindow;
