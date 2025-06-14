import { Category } from '../../store/api/types';

function handleDeepLink({
  type,
  value,
  categories,
  products,
  setSelectedCategory,
  navigation,
  setError,
}: {
  type?: string;
  value?: string;
  categories: Category[];
  products?: any[];
  setSelectedCategory: (cat: Category) => void;
  navigation: any;
  setError: (msg: string) => void;
}) {
  if (!type || !value) return;

  if (type === 'category' && categories.length > 0) {
    const found = categories.find(
      c => c.name.toLowerCase() === value.toString().toLowerCase(),
    );
    if (found) {
      setSelectedCategory(found);
    } else {
      setError('Category not found');
    }
    return;
  }

  if (type === 'product' && products && products.length > 0) {
    const found = products.find(p => p.id.toString() === value.toString());
    if (found) {
      navigation.navigate('ProductDetail', { product: found });
    } else {
      setError('Product not found');
    }
    return;
  }
}
export { handleDeepLink };