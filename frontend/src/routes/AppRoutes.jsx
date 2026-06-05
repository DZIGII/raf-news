import { Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import CmsLayout from "../layouts/CmsLayout";
import ProtectedRoute from "./ProtectedRoute";
import { ROLES } from "../utils/roles";

import LoginPage from "../pages/auth/LoginPage";

import HomePage from "../pages/public/HomePage";
import MostReadPage from "../pages/public/MostReadPage";
import CategoryPage from "../pages/public/CategoryPage";
import TagPage from "../pages/public/TagPage";
import SearchPage from "../pages/public/SearchPage";
import NewsDetailsPage from "../pages/public/NewsDetailsPage";

import CategoriesPage from "../pages/cms/CategoriesPage";
import CategoryFormPage from "../pages/cms/CategoryFormPage";
import NewsPage from "../pages/cms/NewsPage";
import NewsFormPage from "../pages/cms/NewsFormPage";
import CmsSearchPage from "../pages/cms/CmsSearchPage";

// admin
import UsersPage from "../pages/cms/UserPage";
import UserFormPage from "../pages/cms/UserFormPage";

const AppRoutes = () => {
    return (
        <Routes>

            {/* AUTH */}
            <Route path="/login" element={<LoginPage />} />

            {/* PUBLIC */}
            <Route path="/" element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="most-read" element={<MostReadPage />} />
                <Route path="category/:id" element={<CategoryPage />} />
                <Route path="tag/:id" element={<TagPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="news/:id" element={<NewsDetailsPage />} />
            </Route>

            {/* CMS */}
            <Route
                path="/cms"
                element={
                    <ProtectedRoute roles={[ROLES.ADMIN, ROLES.CREATOR]}>
                        <CmsLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="categories/new" element={<CategoryFormPage />} />
                <Route path="categories/edit/:id" element={<CategoryFormPage />} />

                <Route path="news" element={<NewsPage />} />
                <Route path="news/new" element={<NewsFormPage />} />
                <Route path="news/edit/:id" element={<NewsFormPage />} />

                <Route path="search" element={<CmsSearchPage />} />
            </Route>

            {/* ADMIN ONLY */}
            <Route
                path="/cms/users"
                element={
                    <ProtectedRoute roles={[ROLES.ADMIN]}>
                        <CmsLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<UsersPage />} />
                <Route path="new" element={<UserFormPage />} />
                <Route path="edit/:id" element={<UserFormPage />} />
            </Route>

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" />} />

        </Routes>
    );
};

export default AppRoutes;