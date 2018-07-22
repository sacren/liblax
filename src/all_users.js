/*!
  * all_users.js v0.1.0
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

  var analytics = {
    init: function () {
      analytics.setDisplayMsg()
      analytics.setForm()
      analytics.makeSelection()
      analytics.submitForm()
    },

    setDisplayMsg: function () {
      $('form + div').html('Would you like to show the number of all users?')
    },

    setForm: function () {
      $('form input').val('Show All Users')
    },

    makeSelection: function () {
      $('form > select').change(function () {
        $('form input').prop('disabled', false)
        analytics.setDisplayMsg()
      })
    },

    submitForm: function () {
      $('form').submit(function () {
        var url = 'https://mediafiles.uvu.edu/lib/pages.php'

        url = checkUrl(url)
        $('form input').prop('disabled', true)
        $('form + div').html('Pulling data, please wait...')

        $.post(url, $(this).serialize(), function (data) {
          var course = $('select option:selected').text().replace(/-/g, ' ')
          var selected = parseInt($('select option:selected').val())
          var d = JSON.parse(data)
          var a = []

          if (d.length === 0) {
            $('form + div').html('Data error!')
            return
          }

          for (var i in d) {
            var courseId = parseInt(d[i]['course_id'])
            var uid = parseInt(d[i]['user_id'])

            if (courseId !== selected) { continue }

            if (!a.some(function (x) { return x === uid })) { a.push(uid) }
          }

          var n = a.length
          if (n === 0) {
            $('form + div').html(function () {
              var line1 = '<div>' + course + '</div>'
              var line2 = '<div>' + 'No enrollment' + '</div>'

              return line1 + line2
            })

            return
          }

          if (n === 1) {
            $('form + div').html(function () {
              var line1 = '<div>' + course + '</div>'
              var line2 = '<div>' + 'One student in total' + '</div>'

              return line1 + line2
            })

            return
          }

          $('form + div').html(function () {
            var line1 = '<div>' + course + '</div>'
            var line2 = '<div>' + n + ' students in total' + '</div>'

            return line1 + line2
          })
        }).fail(function () {
          window.alert('Error: Pulling data!')
        })

        return false
      })
    }
  }

  analytics.init()
})
