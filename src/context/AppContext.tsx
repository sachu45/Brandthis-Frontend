import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_BRAND_DNA,
  INITIAL_BRANDS,
  INITIAL_CREDITS,
  INITIAL_PROFILES,
  INITIAL_UPLOADS,
} from '../data/constants';
import { initialsFromName } from '../lib/brand';
import type {
  Brand,
  BrandDNA,
  ModalId,
  PageName,
  Profile,
  UploadedImage,
  ViewName,
} from '../types';

interface AppState {
  /* View + page routing */
  view: ViewName;
  page: PageName;
  showView: (view: ViewName) => void;
  showPage: (page: PageName) => void;
  enterApp: () => void;

  /* Profiles */
  profiles: Profile[];
  activeProfileIndex: number;
  activeProfile: Profile;
  switchProfile: (index: number) => void;
  addProfile: () => void;
  updateActiveProfile: (patch: Partial<Profile>) => void;

  /* Brands */
  brands: Brand[];
  addBrand: (brand: Brand) => void;
  activeBrandId: string | null;
  activeBrand: Brand | null;
  openBrandWorkspace: (brand: Brand) => void;
  closeBrandWorkspace: () => void;
  updateBrandDNA: (brandId: string, dna: BrandDNA) => void;

  /* Credits + generation */
  credits: number;
  spendCredits: (amount: number) => void;
  resolution: number;
  setResolution: (resolution: number) => void;

  /* Uploads */
  uploads: UploadedImage[];
  addUpload: (upload: UploadedImage) => void;

  /* Brief shared between the ad library, image picker, and the AI rail */
  brief: string;
  setBrief: (brief: string) => void;
  briefFocusToken: number;
  fillBrief: (text: string) => void;

  /* Overlays */
  openModalId: ModalId | null;
  openModal: (id: ModalId) => void;
  closeModal: () => void;
  imagePickerTab: 'uploads' | 'new';
  setImagePickerTab: (tab: 'uploads' | 'new') => void;
  dropdownOpen: boolean;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  profileSwitcherOpen: boolean;
  toggleProfileSwitcher: () => void;
  closeProfileSwitcher: () => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  chatOpen: boolean;
  toggleChat: () => void;

  /* Toast */
  toast: string | null;
  showToast: (message: string) => void;

  /* Onboarding hand-off */
  onboardingSeed: string;
  openOnboarding: (seed?: string) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<ViewName>('landing');
  const [page, setPage] = useState<PageName>('brands');

  const [profiles, setProfiles] = useState<Profile[]>(INITIAL_PROFILES);
  const [activeProfileIndex, setActiveProfileIndex] = useState(0);

  const [brands, setBrands] = useState<Brand[]>(INITIAL_BRANDS);
  const [activeBrandId, setActiveBrandId] = useState<string | null>(null);

  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [resolution, setResolution] = useState(2);
  const [uploads, setUploads] = useState<UploadedImage[]>(INITIAL_UPLOADS);

  const [brief, setBrief] = useState('');
  const [briefFocusToken, setBriefFocusToken] = useState(0);

  const [openModalId, setOpenModalId] = useState<ModalId | null>(null);
  const [imagePickerTab, setImagePickerTab] = useState<'uploads' | 'new'>('uploads');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileSwitcherOpen, setProfileSwitcherOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  const [onboardingSeed, setOnboardingSeed] = useState('');

  const showToast = useCallback((message: string) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const closeAllOverlays = useCallback(() => {
    setOpenModalId(null);
    setDropdownOpen(false);
    setProfileSwitcherOpen(false);
  }, []);

  const showView = useCallback(
    (next: ViewName) => {
      setView(next);
      closeAllOverlays();
      window.scrollTo(0, 0);
    },
    [closeAllOverlays],
  );

  const showPage = useCallback((next: PageName) => {
    setPage(next);
    if (next !== 'brand-workspace') setActiveBrandId(null);
  }, []);

  const enterApp = useCallback(() => {
    showView('app');
    showPage('brands');
  }, [showPage, showView]);

  const switchProfile = useCallback(
    (index: number) => {
      setProfiles((current) => {
        if (!current[index]) return current;
        setActiveProfileIndex(index);
        showToast('Switched to ' + current[index].name);
        return current;
      });
      setProfileSwitcherOpen(false);
    },
    [showToast],
  );

  const addProfile = useCallback(() => {
    const name = window.prompt('Name this profile');
    if (!name || !name.trim()) return;
    const cleanName = name.trim();
    const profile: Profile = {
      name: cleanName,
      email: 'New profile',
      initials: initialsFromName(cleanName),
      role: 'Member',
    };
    setProfiles((current) => {
      const next = [...current, profile];
      setActiveProfileIndex(next.length - 1);
      return next;
    });
    setProfileSwitcherOpen(false);
    showToast('Switched to ' + cleanName);
  }, [showToast]);

  const updateActiveProfile = useCallback(
    (patch: Partial<Profile>) => {
      setProfiles((current) =>
        current.map((profile, index) =>
          index === activeProfileIndex ? { ...profile, ...patch } : profile,
        ),
      );
    },
    [activeProfileIndex],
  );

  const addBrand = useCallback((brand: Brand) => {
    setBrands((current) => [...current, brand]);
  }, []);

  const openBrandWorkspace = useCallback((brand: Brand) => {
    setBrands((current) =>
      current.map((item) =>
        item.id === brand.id && !item.dna
          ? { ...item, dna: { ...DEFAULT_BRAND_DNA } }
          : item,
      ),
    );
    setActiveBrandId(brand.id);
    setPage('brand-workspace');
  }, []);

  const closeBrandWorkspace = useCallback(() => {
    setActiveBrandId(null);
    setPage('brands');
  }, []);

  const updateBrandDNA = useCallback((brandId: string, dna: BrandDNA) => {
    setBrands((current) =>
      current.map((brand) => (brand.id === brandId ? { ...brand, dna } : brand)),
    );
  }, []);

  const spendCredits = useCallback((amount: number) => {
    setCredits((current) => current - amount);
  }, []);

  const addUpload = useCallback((upload: UploadedImage) => {
    setUploads((current) => [{ ...upload, userAdded: true }, ...current]);
  }, []);

  const fillBrief = useCallback((text: string) => {
    setBrief(text);
    setBriefFocusToken((token) => token + 1);
  }, []);

  const openModal = useCallback((id: ModalId) => setOpenModalId(id), []);
  const closeModal = useCallback(() => setOpenModalId(null), []);
  const toggleDropdown = useCallback(() => setDropdownOpen((open) => !open), []);
  const closeDropdown = useCallback(() => setDropdownOpen(false), []);
  const toggleProfileSwitcher = useCallback(
    () => setProfileSwitcherOpen((open) => !open),
    [],
  );
  const closeProfileSwitcher = useCallback(() => setProfileSwitcherOpen(false), []);
  const toggleSidebar = useCallback(
    () => setSidebarCollapsed((collapsed) => !collapsed),
    [],
  );
  const toggleChat = useCallback(() => setChatOpen((open) => !open), []);

  const openOnboarding = useCallback(
    (seed = '') => {
      setOnboardingSeed(seed);
      showView('onboarding');
    },
    [showView],
  );

  const activeProfile = profiles[activeProfileIndex] ?? profiles[0];
  const activeBrand = brands.find((brand) => brand.id === activeBrandId) ?? null;

  const value = useMemo<AppState>(
    () => ({
      view,
      page,
      showView,
      showPage,
      enterApp,
      profiles,
      activeProfileIndex,
      activeProfile,
      switchProfile,
      addProfile,
      updateActiveProfile,
      brands,
      addBrand,
      activeBrandId,
      activeBrand,
      openBrandWorkspace,
      closeBrandWorkspace,
      updateBrandDNA,
      credits,
      spendCredits,
      resolution,
      setResolution,
      uploads,
      addUpload,
      brief,
      setBrief,
      briefFocusToken,
      fillBrief,
      openModalId,
      openModal,
      closeModal,
      imagePickerTab,
      setImagePickerTab,
      dropdownOpen,
      toggleDropdown,
      closeDropdown,
      profileSwitcherOpen,
      toggleProfileSwitcher,
      closeProfileSwitcher,
      sidebarCollapsed,
      toggleSidebar,
      chatOpen,
      toggleChat,
      toast,
      showToast,
      onboardingSeed,
      openOnboarding,
    }),
    [
      view,
      page,
      showView,
      showPage,
      enterApp,
      profiles,
      activeProfileIndex,
      activeProfile,
      switchProfile,
      addProfile,
      updateActiveProfile,
      brands,
      addBrand,
      activeBrandId,
      activeBrand,
      openBrandWorkspace,
      closeBrandWorkspace,
      updateBrandDNA,
      credits,
      spendCredits,
      resolution,
      uploads,
      addUpload,
      brief,
      briefFocusToken,
      fillBrief,
      openModalId,
      openModal,
      closeModal,
      imagePickerTab,
      dropdownOpen,
      toggleDropdown,
      closeDropdown,
      profileSwitcherOpen,
      toggleProfileSwitcher,
      closeProfileSwitcher,
      sidebarCollapsed,
      toggleSidebar,
      chatOpen,
      toggleChat,
      toast,
      showToast,
      onboardingSeed,
      openOnboarding,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside <AppProvider>');
  return context;
}
