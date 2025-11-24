import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ComboboxControl } from '@wordpress/components';
import './editor.scss';

const BUSINESS_TYPES = [
	'LocalBusiness',
	'AutomotiveBusiness',
	'ChildCare',
	'Dentist',
	'DryCleaningOrLaundry',
	'Electrician',
	'EmergencyService',
	'EntertainmentBusiness',
	'FinancialService',
	'FoodEstablishment',
	'GovernmentOffice',
	'HealthAndBeautyBusiness',
	'HomeAndConstructionBusiness',
	'HomeGoodsStore',
	'HVACBusiness',
	'InternetCafe',
	'LegalService',
	'Library',
	'LodgingBusiness',
	'MovingCompany',
	'ProfessionalService',
	'RadioStation',
	'RecyclingCenter',
	'RoofingContractor',
	'SelfStorage',
	'ShoppingCenter',
	'SportsActivityLocation',
	'Store',
	'TelevisionStation',
	'TouristInformationCenter',
	'TravelAgency',
];
const businessTypeOptions = BUSINESS_TYPES.map( ( type ) => ( {
	label: __( type, 'gutenberg-seo-blocks' ),
	value: type,
} ) );

export default function Edit( { attributes, setAttributes } ) {
	const {
		businessName,
		businessType,
		url,
		telephone,
		priceRange,
		streetAddress,
		addressLocality,
		addressRegion,
		postalCode,
		addressCountry,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'gsb-local-business-block',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Business Details', 'gutenberg-seo-blocks' ) } initialOpen>
					<TextControl
						label={ __( 'Business Name', 'gutenberg-seo-blocks' ) }
						value={ businessName }
						onChange={ ( value ) => setAttributes( { businessName: value } ) }
						help={ __( 'Schema will not output unless a name is provided.', 'gutenberg-seo-blocks' ) }
					/>
					<ComboboxControl
						label={ __( 'Business Type', 'gutenberg-seo-blocks' ) }
						value={ businessType }
						options={ businessTypeOptions }
						onChange={ ( value ) => setAttributes( { businessType: value || 'LocalBusiness' } ) }
						allowCustomValue
						help={ __( 'Start typing to search schema types or enter your own.', 'gutenberg-seo-blocks' ) }
					/>
					<TextControl
						label={ __( 'URL', 'gutenberg-seo-blocks' ) }
						value={ url }
						onChange={ ( value ) => setAttributes( { url: value } ) }
						help={ __( 'Defaults to this page URL if empty.', 'gutenberg-seo-blocks' ) }
					/>
					<TextControl
						label={ __( 'Telephone', 'gutenberg-seo-blocks' ) }
						value={ telephone }
						onChange={ ( value ) => setAttributes( { telephone: value } ) }
					/>
					<TextControl
						label={ __( 'Price Range', 'gutenberg-seo-blocks' ) }
						value={ priceRange }
						onChange={ ( value ) => setAttributes( { priceRange: value } ) }
						placeholder="$$"
					/>
				</PanelBody>

				<PanelBody title={ __( 'Address', 'gutenberg-seo-blocks' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Street Address', 'gutenberg-seo-blocks' ) }
						value={ streetAddress }
						onChange={ ( value ) => setAttributes( { streetAddress: value } ) }
					/>
					<TextControl
						label={ __( 'City', 'gutenberg-seo-blocks' ) }
						value={ addressLocality }
						onChange={ ( value ) => setAttributes( { addressLocality: value } ) }
					/>
					<TextControl
						label={ __( 'State / Region', 'gutenberg-seo-blocks' ) }
						value={ addressRegion }
						onChange={ ( value ) => setAttributes( { addressRegion: value } ) }
					/>
					<TextControl
						label={ __( 'Postal Code', 'gutenberg-seo-blocks' ) }
						value={ postalCode }
						onChange={ ( value ) => setAttributes( { postalCode: value } ) }
					/>
					<TextControl
						label={ __( 'Country Code', 'gutenberg-seo-blocks' ) }
						value={ addressCountry }
						onChange={ ( value ) => setAttributes( { addressCountry: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<h3 className="gsb-local-business-title">{ __( 'SEO Local Business Schema', 'gutenberg-seo-blocks' ) }</h3>

				{ businessName ? (
					<p>
						{ __( 'Schema will be generated for:', 'gutenberg-seo-blocks' ) }{' '}
						<strong>{ businessName }</strong>
					</p>
				) : (
					<p>{ __( 'Enter a business name to generate schema.', 'gutenberg-seo-blocks' ) }</p>
				) }

				<p className="gsb-local-business-note">
					{ __( 'This block outputs JSON-LD only; nothing visual on the front end.', 'gutenberg-seo-blocks' ) }
				</p>
			</div>
		</>
	);
}
