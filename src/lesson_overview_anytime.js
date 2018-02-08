jQuery(function ($) {
  function getLessonNumber (s) {
    var lessonNumber
    var tmp

    tmp = s.split('/')
    tmp = tmp[tmp.length - 1].split('-')

    for (var i = 0; i < tmp.length; i++) {
      lessonNumber = tmp[i]
      if (!isNaN(lessonNumber)) { break }
    }

    return lessonNumber
  }

  function setForm () {
    $('form input').val('Show Overview Anytime')
  }

  function setDisplayMsg () {
    var msg = 'Would you like to show the lesson overview at any time?'
    $('form + div').html(msg)
  }

  $('form').submit(function () {
    var url = 'https://mediafiles.uvu.edu/lib/extracted.php'
    var msg = 'Pulling data, please wait...'
    var i

    $('form input').prop('disabled', true)
    $('form + div').html(msg)

    $.post(url, $(this).serialize(), function (data) {
      var course = $('select option:selected').text().replace(/-/g, ' ')
      var msg = ' students visited overview page.'
      var selected = parseInt($('select option:selected').val())
      var pattern = /(week|lesson)-([1-9]|1[0-6])-overview|overview-(lesson|week)-([1-9]|1[0-6])/i
      var d = {}
      var courseUsers = []
      var overviewUsers = {
        lessonId: []
      }
      var p

      for (i = 1; i < 20; i++) {
        overviewUsers[i] = []
      }

      d = $.parseJSON(data)
      if (d.length === 0) {
        $('form + div').html('No enrollment.')
        return
      }

      for (i in d) {
        var courseId = parseInt(d[i]['course_id'])
        var uid = parseInt(d[i]['user_id'])
        var match = d[i]['http_request_clean']
        var lesson

        if (courseId !== selected) { continue }

        if (!courseUsers.some(function (x) { return x === uid })) { courseUsers.push(uid) }

        if (pattern.test(match)) {
          lesson = getLessonNumber(match)
          if (!overviewUsers.lessonId.some(function (x) { return x === lesson })) {
            overviewUsers.lessonId.push(lesson)
          }

          if (!overviewUsers[lesson].some(function (x) { return x === uid })) {
            overviewUsers[lesson].push(uid)
          }
        }
      }

      var n = courseUsers.length
      var m = overviewUsers.length

      if (n === 0) {
        $('form + div').html(function () {
          var openDiv = '<div>'
          var closeDiv = '</div>'
          var line1 = openDiv + course + closeDiv
          var line2 = openDiv + 'No enrollment.' + closeDiv

          return line1 + line2
        })

        return
      }

      if (m === 0) {
        $('form + div').html(function () {
          var openDiv = '<div>'
          var closeDiv = '</div>'
          var line1 = openDiv + course + closeDiv
          var line2 = openDiv + 'At any time, no student visited overview page.' + closeDiv

          return line1 + line2
        })

        return
      }

      if (n === m) {
        $('form + div').html(function () {
          var openDiv = '<div>'
          var closeDiv = '</div>'
          var line1 = openDiv + course + closeDiv
          var line2 = openDiv + 'At any time, ' + m + ' or 100%' + msg + closeDiv

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
        var line2 = openDiv + 'At any time, ' + msg + closeDiv

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
