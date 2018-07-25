#!/usr/bin/env node
/**
 * xkcd-password commandline utility.
 *
 * @since 0.0.1
 */
var chalk = require("chalk")
var error = chalk.bold.red
var Cli = require("../lib/cli.js")

var cli = new Cli()

/* eslint-disable no-console */
cli.parse(process.argv.slice(2), function(err, message, options) {
  if (err) {
    console.error(
      error(
        "\nYou had errors in your syntax. Use --help for further information."
      )
    )
    err.forEach(function(e) {
      console.error(e.message)
    })
  } else if (message) {
    console.log(message)
  } else {
    var XKCDPassword = require("../")
    var pw = null

    // use the word file if we were given one
    if (options.wordFile) {
      pw = new XKCDPassword().initWithWordFile(options.wordFile)
    } else {
      pw = new XKCDPassword()
    }

    // generate the password, output the result
    pw.generate(options)
      .then(function(result) {
        console.log(result.join(options.separator))
      })
      // eslint-disable-next-line no-shadow
      .catch(function(err) {
        console.error(error("\nThere was an error generating your password."))
        console.error(err.message)
        process.exit(1)
      })
  }
})
/* eslint-enable no-console */
