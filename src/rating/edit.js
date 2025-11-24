import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const {
		itemName,
		itemUrl,
		ratingValue,
		ratingCount,
		bestRating = '5',
		worstRating = '1',
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'gsb-rating-block-editor',
	} );

	const best = bestRating || '5';
	const worst = worstRating || '1';

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Rating Details', 'gutenberg-seo-blocks' ) } initialOpen>
					<TextControl
						label={ __( 'Item Name', 'gutenberg-seo-blocks' ) }
						value={ itemName }
						onChange={ ( value ) => setAttributes( { itemName: value } ) }
					/>
					<TextControl
						label={ __( 'Item URL', 'gutenberg-seo-blocks' ) }
						value={ itemUrl }
						onChange={ ( value ) => setAttributes( { itemUrl: value } ) }
						help={ __( 'Defaults to this page URL if empty.', 'gutenberg-seo-blocks' ) }
					/>
					<TextControl
						label={ __( 'Rating Value', 'gutenberg-seo-blocks' ) }
						value={ ratingValue }
						onChange={ ( value ) => setAttributes( { ratingValue: value } ) }
						required
						help={ __( 'Required. Example: 4.8', 'gutenberg-seo-blocks' ) }
					/>
					<TextControl
						label={ __( 'Rating Count', 'gutenberg-seo-blocks' ) }
						value={ ratingCount }
						onChange={ ( value ) => setAttributes( { ratingCount: value } ) }
					/>
					<TextControl
						label={ __( 'Best Rating', 'gutenberg-seo-blocks' ) }
						value={ bestRating }
						onChange={ ( value ) => setAttributes( { bestRating: value } ) }
					/>
					<TextControl
						label={ __( 'Worst Rating', 'gutenberg-seo-blocks' ) }
						value={ worstRating }
						onChange={ ( value ) => setAttributes( { worstRating: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<h3 className="gsb-rating-title">{ __( 'SEO Rating Schema', 'gutenberg-seo-blocks' ) }</h3>
				{ ratingValue ? (
					<p>
						{ __( 'Rating schema will be generated:', 'gutenberg-seo-blocks' ) }{' '}
						<strong>{ ratingValue }</strong> / { best }
						{ ratingCount ? (
							<span>
								{ __( ' from ', 'gutenberg-seo-blocks' ) }
								{ ratingCount } { __( 'ratings', 'gutenberg-seo-blocks' ) }
							</span>
						) : null }
						{ __( ' for ', 'gutenberg-seo-blocks' ) }
						{ itemName ? <strong>{ itemName }</strong> : __( 'this page', 'gutenberg-seo-blocks' ) }.
					</p>
				) : (
					<p>{ __( 'Enter at least a rating value to generate schema.', 'gutenberg-seo-blocks' ) }</p>
				) }
				<p className="gsb-rating-note">
					{ __( 'This block outputs AggregateRating JSON-LD only; nothing visual on the front end.', 'gutenberg-seo-blocks' ) }
				</p>
			</div>
		</>
	);
}
