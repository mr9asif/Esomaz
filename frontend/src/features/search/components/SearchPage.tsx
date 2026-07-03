import SearchDropdown from '@/components/ui/SearchDropdown';
import MainLayout from '@/layouts/MainLayout';

const SearchPage = () => {
    
    return (
    <div className="max-w-3xl mx-auto px-4 pt-8">
        <MainLayout>
    <SearchDropdown mode="page" />
    </MainLayout>
</div>
    );
};

export default SearchPage;