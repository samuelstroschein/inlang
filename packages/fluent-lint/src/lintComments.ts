import { Result } from '@inlang/common';
import { Comments } from '@inlang/fluent-syntax';
import { LintError } from './errors/LintError';
import { LintArguments } from './types/LintArguments';
import { LintResult } from './types/LintResult';

/**
 * Always returns `Result.ok`
 *
 * Comments don't need to be linted. (If you disagree please open an issue.)
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function lintComments(args: LintArguments<Comments>): LintResult {
    if (args.source.type !== args.target.type) {
        return Result.err(LintError.typeMismatch(args));
    }
    return Result.ok('isOk');
}
