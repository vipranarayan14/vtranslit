import { expect } from 'chai';
import { vTranslit } from '../../src/index';
import { vTranslitSchemeDeva } from 'vtranslit-scheme-deva';
import { vTranslitSchemeItrn } from 'vtranslit-scheme-itrn';
import { vTranslitSchemeKnda } from 'vtranslit-scheme-knda';
import { vTranslitSchemeTaml } from 'vtranslit-scheme-taml';
import { vTranslitSchemeTelu } from 'vtranslit-scheme-telu';

const vtranslit = vTranslit([
  vTranslitSchemeDeva,
  vTranslitSchemeItrn,
  vTranslitSchemeKnda,
  vTranslitSchemeTaml,
  vTranslitSchemeTelu,
]);

/*
  vTranslit sets options.translitMode to 3 over-riding userOption.translitMode.
  options.translitMode: 3 'marked' + 'multi' // only #{}# translit'ed with scheme marked by '@'.
*/

describe('vTranslit with toScheme as `Multi`', () => {
  const vt = vtranslit.init('Itrn', 'Multi');

  it('should translit only the contents of `#{}#` to the scheme marked by `@`.', () => {
    expect(
      vt(
        `
      @Hello #{@Deva rAma}##{@Deva kRRiShNa}# !
      @Hello #{@Knda rAma}##{@Knda kRRiShNa}# !
      @Hello #{@Taml rAma}##{ @Taml kruShNa}# !
      @Hello #{@Telu rAma}##{@Telu kRRiShNa}# !
      `
      )
    ).to.equal(
      `
      @Hello रामकृष्ण !
      @Hello ರಾಮಕೃಷ್ಣ !
      @Hello ராம க்ருஷ்ண !
      @Hello రామకృష్ణ !
      `
    );
  });
});
