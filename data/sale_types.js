module.exports = [
  {
    name: 'Everything',
    do_require_dragons: false,
    desc:'Selecting this option will ONLY generate the general everything list. If you want more interest in your sale, we highly recommend selecting a specific sales type.',
  },
  {
    name: 'Flat sale',
    do_require_dragons: true,
    desc:'For sales threads with a flat offer price. Proceed to the next step to import dragon details.',
  },
  {
    name: 'Auction',
    do_require_dragons: true,
    desc:'For auction threads where users bid to out offer each other. Proceed to the next step to import dragon details.',
  },
  {
    name: 'Offer',
    do_require_dragons: true,
    desc:'For sales threads without a set buy price where other users make offers. Proceed to the next step to import dragon details.',
  },
  {
    name: 'Interest check',
    do_require_dragons: true,
    desc:'For share threads to garner interest in a dragon before deciding to sell. Proceed to the next step to import dragon details.',
  },
  {
    name: 'Mass hatches',
    do_require_dragons: false,
    desc:'For mass hatch threads of 20+ eggs being hatched over the course of one single day. Please do not ping more than 48 hours in advance. Proceed to the final step to generate the list.',
  },
  {
    name: 'Contest',
    do_require_dragons: false,
    desc:'For contest threads where prizes include gen1s. Proceed to the final step to generate the list.',
  },
  {
    name: 'Raffle',
    do_require_dragons: false,
    desc:'For raffle threads where prizes include gen1s. Proceed to the final step to generate the list.',
  },
  {
    name: 'Grab bags and other RNG',
    do_require_dragons: false,
    desc:'For other threads with an RNG based element that include gen1s as prizes. This does not include scatter projects. Proceed to the final step to generate the list.',
  }
];
