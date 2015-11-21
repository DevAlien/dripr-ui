function notifyError(err) {
  console.log('\x07' + err);
}

function notifyWarning(warn) {
  console.log(warn);
}

function notifyStats(stats) {
  var json = stats.toJson();

  if (json.errors.length) {
    notifyError(json.errors[0]);
    // json.errors.forEach(notifyError);
  } else if (json.warnings.length) {
    json.warnings.forEach(notifyWarning);
  } else {
    console.log(stats.toString({
      chunks: false,
      colors: true
    }));
  }
}

export default notifyStats;
