assertions = [
	['j\'attache le fichier "(?P[^"]*)" à "(?P<field>(?:[^"]|\\")*)"',    '- Attaches file to field with specified id|name|label|value.',    '# Behat\MinkExtension\Context\MinkContext::attachFileToField()'],
	['j\'attends "([^"]*)" secondes',null,    '# TestContext::jAttendsSecondes()'],
	['j\'avance d\'une page',    '- Moves forward one page in history',    '# Behat\MinkExtension\Context\MinkContext::forward()'],
	['je capture dans "(?P<filename>[^"]*)"',null,    '# TestContext::iSaveAScreenshotIn()'],
	['la case à cocher "(?P<checkbox>(?:[^"]|\\")*)" ne devrait pas être cochée',    '- Checks, that checkbox with specified in|name|label|value is unchecked.',    '# Behat\MinkExtension\Context\MinkContext::assertCheckboxNotChecked()'],
	['la case à cocher "(?P<checkbox>[^"]*)" devrait être cochée',    '- Checks, that checkbox with specified in|name|label|value is checked.',    '# Behat\MinkExtension\Context\MinkContext::assertCheckboxChecked()'],
	['le champ "(?P<field>(?:[^"]|\\")*)" devrait contenir "(?P<value>(?:[^"]|\\")*)"',    '- Checks, that form field with specified id|name|label|value has specified value.',    '# Behat\MinkExtension\Context\MinkContext::assertFieldContains()'],
	['le champ "(?P<field>(?:[^"]|\\")*)" ne devrait pas contenir "(?P<value>(?:[^"]|\\")*)"',    '- Checks, that form field with specified id|name|label|value doesn\'t have specified value.',    '# Behat\MinkExtension\Context\MinkContext::assertFieldNotContains()'],
	['je clique "([^"]*)"',null,    '# TestContext::jeClique()'],
	['je coche "(?P<option>(?:[^"]|\\")*)"',    '- Checks checkbox with specified id|name|label|value.',    '# Behat\MinkExtension\Context\MinkContext::checkOption()'],
	['le code de status de la réponse devrait être (?P<code>\d+)',    '- Checks, that current page response status is equal to specified.',    '# Behat\MinkExtension\Context\MinkContext::assertResponseStatus()'],
	['le code de status de la réponse ne devrait pas être (?P<code>\d+)',    '- Checks, that current page response status is not equal to specified.',    '# Behat\MinkExtension\Context\MinkContext::assertResponseStatusIsNot()'],
	['je décoche "(?P<option>(?:[^"]|\\")*)"',    '- Unchecks checkbox with specified id|name|label|value.',    '# Behat\MinkExtension\Context\MinkContext::uncheckOption()'],
	['je devrais être sur "(?P<page>[^"]+)"',    '- Checks, that current page PATH is equal to specified.',    '# Behat\MinkExtension\Context\MinkContext::assertPageAddress()'],
	['je devrais être sur la page d\'accueil',    '- Checks, that current page is the homepage.',    '# Behat\MinkExtension\Context\MinkContext::assertHomepage()'],
	['je devrais voir "(?P<text>(?:[^"]|\\")*)"',    '- Checks, that page contains specified text.',    '# Behat\MinkExtension\Context\MinkContext::assertPageContainsText()'],
	['je devrais voir "(?P<text>(?:[^"]|\\")*)" dans l\'élément "(?P<element>[^"]*)"',    '- Checks, that element with specified CSS contains specified text.',    '# Behat\MinkExtension\Context\MinkContext::assertElementContainsText()'],
	['je devrais voir (?P<num>\d+) éléments? "(?P<element>[^"]*)"',    '- Checks, that (?P<num>\d+) CSS elements exist on the page',    '# Behat\MinkExtension\Context\MinkContext::assertNumElements()'],
	['je devrais voir l\'élément "(?P<element>[^"]*)"',    '- Checks, that element with specified CSS exists on page.',    '# Behat\MinkExtension\Context\MinkContext::assertElementOnPage()'],
	['je devrais voir un texte suivant le motif (?P<pattern>"(?:[^"]|\\")*")',    '- Checks, that page contains text matching specified pattern.',    '# Behat\MinkExtension\Context\MinkContext::assertPageMatchesText()'],
	['l\'élément "(?P<element>[^"]*)" devrait contenir "(?P<value>(?:[^"]|\\")*)"',    '- Checks, that element with specified CSS contains specified HTML.',    '# Behat\MinkExtension\Context\MinkContext::assertElementContains()'],
	['l\'élément "(?P<element>[^"]*)" ne devrait pas contenir "(?P<value>(?:[^"]|\\")*)"',    '- Checks, that element with specified CSS doesn\'t contain specified HTML.',    '# Behat\MinkExtension\Context\MinkContext::assertElementNotContains()'],
	['je ferme la popin',null,    '# TestContext::jeFermeLaPopin()'],
	['i fill in "(?P<field>(?:[^"]|\\")*)" with:',    '- Fills in form field with specified id|name|label|value.',    '# Behat\MinkExtension\Context\MinkContext::fillField()'],
	['j\'imprimer la dernière réponse',    '- Prints last response to console.',    '# Behat\MinkExtension\Context\MinkContext::printLastResponse()'],
	['je me connecte',null,    '# TestContext::jeMeConnecte()'],
	['montrer la dernière réponse',    '- Opens last response content in browser.',    '# Behat\MinkExtension\Context\MinkContext::showLastResponse()'],
	['je ne devrais pas voir "(?P<text>(?:[^"]|\\")*)"',    '- Checks, that page doesn\'t contain specified text.',    '# Behat\MinkExtension\Context\MinkContext::assertPageNotContainsText()'],
	['je ne devrais pas voir "(?P<text>(?:[^"]|\\")*)" dans l\'élément "(?P<element>[^"]*)"',    '- Checks, that element with specified CSS doesn\'t contain specified text.',    '# Behat\MinkExtension\Context\MinkContext::assertElementNotContainsText()'],
	['je ne devrais pas voir de texte suivant le motif (?P<pattern>"(?:[^"]|\\")*")',    '- Checks, that page doesn\'t contain text matching specified pattern.',    '# Behat\MinkExtension\Context\MinkContext::assertPageNotMatchesText()'],
	['je ne devrais pas voir l\'élément "(?P<element>[^"]*)"',    '- Checks, that element with specified CSS doesn\'t exist on page.',    '# Behat\MinkExtension\Context\MinkContext::assertElementNotOnPage()'],
	['je pose un point d\'arrêt',null,    '# TestContext::iPutABreakpoint()'],
	['je presse "(?P<button>(?:[^"]|\\")*)"',    '- Presses button with specified id|name|title|alt|value.',    '# Behat\MinkExtension\Context\MinkContext::pressButton()'],
	['print current URL',    '- Prints current URL to console.',    '# Behat\MinkExtension\Context\MinkContext::printCurrentUrl()'],
	['je recharge la page',    '- Reloads current page.',    '# Behat\MinkExtension\Context\MinkContext::reload()'],
	['je reçois un mail a "([^"]*)" avec "([^"]*)"',null,    '# TestContext::jeRecoisUnMailAAvec()'],
	['je recule d\'une page',    '- Moves backward one page in history.',    '# Behat\MinkExtension\Context\MinkContext::back()'],
	['je remplis "(?P<field>(?:[^"]|\")*)" avec le paramètre "(?P<name>(?:[^"]|\")*)"',    '- Remplis les champs de formulaire sur la base de : id|name|label|value avec des paramètres prédéfinis.',    '# TestContext::fillInFieldWithParam()'],
	['je remplis "(?P<field>(?:[^"]|\\")*)" avec "(?P<value>(?:[^"]|\\")*)"',    '- Fills in form field with specified id|name|label|value.',    '# Behat\MinkExtension\Context\MinkContext::fillField()'],
	['je remplis "(?P<value>(?:[^"]|\\")*)" pour "(?P<field>(?:[^"]|\\")*)"',    '- Fills in form field with specified id|name|label|value.',    '# Behat\MinkExtension\Context\MinkContext::fillField()'],
	['je remplis "([^"]*)" avec le paramètre "([^"]*)"',    '- Remplis les champs de formulaire sur la base de : id|name|label|value avec des paramètres prédéfinis.',    '# TestContext::fillInFieldWithParam()'],
	['je remplis le texte suivant:',    '- Fills in form fields with provided table.',    '# Behat\MinkExtension\Context\MinkContext::fillFields()'],
	['la réponse devrait contenir "(?P<text>(?:[^"]|\\")*)"',    '- Checks, that HTML response contains specified string.',    '# Behat\MinkExtension\Context\MinkContext::assertResponseContains()'],
	['la réponse ne devrait pas contenir "(?P<text>(?:[^"]|\\")*)"',    '- Checks, that HTML response doesn\'t contain specified string.',    '# Behat\MinkExtension\Context\MinkContext::assertResponseNotContains()'],
	['je sauvegarde une capture d\'écran dans "(?P<filename>[^"]*)"',null,    '# TestContext::iSaveAScreenshotIn()'],
	['je sélectionne "(?P<option>(?:[^"]|\\")*)" depuis "(?P<select>(?:[^"]|\\")*)"',    '- Selects option in select field with specified id|name|label|value.',    '# Behat\MinkExtension\Context\MinkContext::selectOption()'],
	['je sélectionne l\'iframe',null,    '# TestContext::jeSelectionneLIframe()'],
	['je sélectionne une autre option "(?P<option>(?:[^"]|\\")*)" depuis "(?P<select>(?:[^"]|\\")*)"',    '- Selects additional option in select field with specified id|name|label|value.',    '# Behat\MinkExtension\Context\MinkContext::additionallySelectOption()'],
	['je sélectionne une option depuis "(?P<select>(?:[^"]|\\")*)"',    '- Selection aléatoire d\'une option d\'un champ liste avec id|name|label|value.',    '# TestContext::selectOption()'],
	['je suis "(?P<link>(?:[^"]|\\")*)"',    '- Clicks link with specified id|title|alt|text.',    '# Behat\MinkExtension\Context\MinkContext::clickLink()'],
	['je suis sur "(?P<page>[^"]+)"',    '- Opens specified page.',    '# Behat\MinkExtension\Context\MinkContext::visit()'],
	['je suis sur la page d\'accueil',    '- Opens homepage.',    '# Behat\MinkExtension\Context\MinkContext::iAmOnHomepage()'],
	['the checkbox "(?P<checkbox>(?:[^"]|\\")*)" (?:is|should be) checked',    '- Checks, that checkbox with specified in|name|label|value is checked.',    '# Behat\MinkExtension\Context\MinkContext::assertCheckboxChecked()'],
	['the checkbox "(?P<checkbox>(?:[^"]|\\")*)" is (?:unchecked|not checked)',    '- Checks, that checkbox with specified in|name|label|value is unchecked.',    '# Behat\MinkExtension\Context\MinkContext::assertCheckboxNotChecked()'],
	['the checkbox "(?P<checkbox>(?:[^"]|\\")*)" should (?:be unchecked|not be checked)',    '- Checks, that checkbox with specified in|name|label|value is unchecked.',    '# Behat\MinkExtension\Context\MinkContext::assertCheckboxNotChecked()'],
	['une popin est visible',null,    '# TestContext::unePopinEstVisible()'],
	['l\'url devrait suivre le motif (?P<pattern>"(?:[^"]|\\")*")',    '- Checks, that current page PATH matches regular expression.',    '# Behat\MinkExtension\Context\MinkContext::assertUrlRegExp()'],
	['je vais sur "(?P<page>[^"]+)"',    '- Opens specified page.',    '# Behat\MinkExtension\Context\MinkContext::visit()'],
	['je vais sur la page d\'accueil',    '- Opens homepage.',    '# Behat\MinkExtension\Context\MinkContext::iAmOnHomepage()']
];

var prefix = ['Alors ', 'Donc ', 'Et ', 'Etant donné que ', 'Lorsque ', 'Soit '];