/*!
  * common.js v0.1.0
  * (c) Jεan Sacren <sakiwit@gmail.com>
  * AGPL-3.0
  */
window.jQuery(function ($) {
  function setForm () {
    var opt1 = new window.Option('Select Course', '')
    var list = [
      '420713',
      '397484',
      '393926',
      '404607',
      '411079',
      '435421',
      '417703',
      '419255',
      '397577',
      '414778',
      '418322',
      '411267',
      '418390',
      '427635',
      '410140',
      '393295',
      '417926',
      '392427',
      '397661',
      '418455',
      '411422',
      '395139'
    ]
    var courses = {
      '420713': 'BIOL-1610',
      '397484': 'BIOL-3500',
      '393926': 'HLTH-3000',
      '404607': 'ZOOL-1090',
      '411079': 'MGMT-1010-001',
      '435421': 'EGDT-1020',
      '417703': 'INFO-3130',
      '419255': 'MGMT-1010-X01',
      '397577': 'FIN-1060',
      '414778': 'CJ-1010',
      '418322': 'CJ-1350',
      '411267': 'CJ-3300',
      '418390': 'ES-1150',
      '427635': 'ESMG-425G',
      '410140': 'CJ-470G',
      '393295': 'COMM-1020',
      '417926': 'RUS-266G',
      '392427': 'PHIL-2050',
      '397661': 'PSY-3400',
      '418455': 'SOC-320G',
      '411422': 'ACC-2020',
      '395139': 'MGMT-330G'
    }

    $('select').append(opt1)

    for (var i = 0; i < list.length; i++) {
      var id = list[i]
      var opt2 = new window.Option(courses[id], id)
      $('select').append(opt2)
    }
  }

  function init () {
    setForm()
  }

  init()
})
