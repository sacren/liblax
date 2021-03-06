/*!
  * lesson_overview_within.js v0.1.0
  * (c) Jεan Sacren <sakiwit@gmail.com>
  * AGPL-3.0
  */
window.jQuery(function ($) {
  function checkUrl (url) {
    var forUvu = [
      'for-uvu',
      'github',
      'io'
    ]
    var hostname = window.location.hostname.split('.')

    if (hostname.every(function (x) {
      return forUvu.includes(x)
    })) {
      return url.replace('pages', 'pages-for-uvu')
    }

    return url
  }

  function setForm () {
    $('form input').val('Show Overview Within')
  }

  function setDisplayMsg () {
    $('form + div').html('Would you like to show the lesson overview within the date range?')
  }

  $('form').submit(function () {
    var url = 'https://mediafiles.uvu.edu/lib/pages.php'
    var msg = 'Pulling data, please wait...'

    url = checkUrl(url)
    $('form input').prop('disabled', true)
    $('form + div').html(msg)

    $.post(url, $(this).serialize(), function (data) {
      var course = $('select option:selected').text().replace(/-/g, ' ')
      var msg = ' students visited overview page.'
      var selected = parseInt($('select option:selected').val())
      var pattern = /overview/i
      var d = JSON.parse(data)
      var a = []
      var b = []
      var p

      if (d.length === 0) {
        $('form + div').html('No enrollment.')
        return
      }

      for (var i in d) {
        var timestamp = d[i]['request_timestamp']

        if (timestamp.substring(0, 11) <= '2016-11-01') {
          continue
        }

        if (timestamp.substring(0, 11) >= '2017-02-01') {
          continue
        }

        var courseId = parseInt(d[i]['course_id'])
        var uid = parseInt(d[i]['user_id'])
        var match = d[i]['http_request_clean']

        if (courseId !== selected) { continue }

        if (!a.some(function (x) { return x === uid })) { a.push(uid) }

        if (pattern.test(match) && !b.some(function (x) { return x === uid })) {
          b.push(uid)
        }
      }

      var n = a.length
      var m = b.length

      if (n === 0) {
        $('form + div').html(function () {
          var openDiv = '<div>'
          var closeDiv = '</div>'
          var line1 = openDiv + course + closeDiv
          var line2 = openDiv + 'Within the date range, no student visited overview page.' + closeDiv

          return line1 + line2
        })

        return
      }

      if (m === 0) {
        $('form + div').html(function () {
          var openDiv = '<div>'
          var closeDiv = '</div>'
          var line1 = openDiv + course + closeDiv
          var line2 = openDiv + 'Within the date range, no student visited overview page.' + closeDiv

          return line1 + line2
        })

        return
      }

      if (n === m) {
        $('form + div').html(function () {
          var openDiv = '<div>'
          var closeDiv = '</div>'
          var line1 = openDiv + course + closeDiv
          var line2 = openDiv + 'Within the date range, ' + m + ' or 100%' + msg + closeDiv

          return line1 + line2
        })

        return
      }

      p = m / n * 100
      msg = m + ' or ' + p.toPrecision(2) + '%' + msg
      $('form + div').html(function () {
        var openDiv = '<div>'
        var closeDiv = '</div>'
        var line1 = openDiv + course + closeDiv
        var line2 = openDiv + 'Within the date range, ' + msg + closeDiv

        return line1 + line2
      })
    }).fail(function () {
      window.alert('Error: Pulling data!')
    })

    return false
  })

  $('form > select').change(function () {
    $('form input').prop('disabled', false)
    setDisplayMsg()
  })

  function init () {
    setDisplayMsg()
    setForm()
  }

  init()
})
