function (err) {
      if (err) throw err;
      console.log('write successful');
    }