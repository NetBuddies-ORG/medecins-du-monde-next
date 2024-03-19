import {
	danger,
	fail,
	warn,
	markdown
} from 'danger';

function formatMarkdownTable(title, icon, content)
{
	const tableTemplate = `| | {0} |
| --- | --- |
| {1} | {2} |`

	let result = tableTemplate.replace('{0}', title);
	result = result.replace('{1}', icon);
	result = result.replace('{2}', content);
	return result;
}

if (danger.git.created_files.length > 0) {
	markdown(formatMarkdownTable('Added Files in this PR', ':green_book:', `<ul><li>${danger.git.created_files.join("</li><li>")}</li></ul>`));
	//message(`Added Files in this PR:<ul><li>${danger.git.created_files.join("</li><li>")}</li>`);
}

if (danger.git.deleted_files.length > 0) {
	markdown(formatMarkdownTable('Deleted Files in this PR', ':red_book:', `<ul><li>${danger.git.deleted_files.join("</li><li>")}</li></ul>`));
	//message(`Deleted Files in this PR:<ul><li>${danger.git.deleted_files.join("</li><li>")}</li>`);
}

if (danger.git.modified_files.length > 0) {
	markdown(formatMarkdownTable('Modified Files in this PR', ':orange_book:', `<ul><li>${danger.git.modified_files.join("</li><li>")}</li></ul>`));
	//message(`Changed Files in this PR:<ul><li>${danger.git.modified_files.join("</li><li>")}</li>`);
}


const gitIssueLabels = danger.github.issue.labels;

if (danger.github.pr.head.ref.trim().replace(/-/g, ' ').toLowerCase() === danger.github.pr.title.trim().toLowerCase())
{
	fail("Title must be explicit as it will be used in your release change log.");
}

if (gitIssueLabels.filter((label) => label.name !== 'major' && label.name !== 'minor' && label.name !== 'patch').length <=0)
{
	fail("This pull request needs a different label than 'major', 'minor' and 'patch'.");
}

if (gitIssueLabels.some((label) => label.name === 'ignoring')) {
	if (gitIssueLabels.filter((label) => label.name !== 'ignoring').length !=0) {
		fail ("No other label can be selected if 'ignoring' is selected.");
	}
}


const hasPackageChanges = danger.git.modified_files.includes("package.json");
const hasLockfileChanges = danger.git.modified_files.includes("package-lock.json");
if (hasPackageChanges && !hasLockfileChanges)
{
	warn("There are package.json changes with no corresponding lockfile changes.");
}