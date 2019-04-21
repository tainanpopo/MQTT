$(() => {
    let twitch = ['SMOrc', 'FailFish', 'GivePLZ', 'TakeNRG', 'MingLee', 'Kappa', 'KappaPride', 'PogChamp', 'BibleThump',
        'BloodTrail', 'HeyGuys', 'LUL', 'ResidentSleeper']
    let gugu2525 = ['gugu1Cc', 'gugu1Face', 'gugu11', 'gugu12god', 'gugu18', 'gugu1Angel55', 'gugu1Baka', 'gugu1Annoyed',
        'gugu1Bb', 'gugu1ChuL', 'gugu1ChuR', 'gugu1S2', 'gugu1S', 'gugu1TT', 'gugu1Dance']
    let jinny = ['jinnytOMEGALUL', 'jinnytHype', 'jinnytREE']

    let = gugu2525Content = '';
    for (i = 0; i < gugu2525.length; i++) {
        gugu2525Content += `<img src="../image/${gugu2525[i]}.png" id="${gugu2525[i]}"/>`
    }
    $('.gugu2525').append(`${gugu2525Content}`);
});