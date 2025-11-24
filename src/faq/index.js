import { registerBlockType } from '@wordpress/blocks';
import metadata from '../../blocks/faq/block.json';
import Edit from './edit';

registerBlockType( metadata.name, {
	...metadata,
	edit: Edit,
	save: () => null,
} );
